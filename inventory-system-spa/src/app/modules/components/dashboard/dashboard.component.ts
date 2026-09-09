import { Component, OnInit } from '@angular/core';
import { finalize, take, tap } from 'rxjs';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { SalesService } from '../../services/sales.service';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';

interface CategoryStat {
  name: string;
  skus: number;
  units: number;
  value: number;
  share: number; // 0..1 relative to the largest category by value
}

interface ValuedItem {
  item: InventoryModel;
  value: number;
}

type SalesPeriod = 'day' | 'week' | 'month';

interface SalesBar {
  label: string;
  value: number;
  pct: number; // 0..100 relative to the tallest bar
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private static readonly LOW_STOCK_THRESHOLD = 10;
  readonly lowStockThreshold = DashboardComponent.LOW_STOCK_THRESHOLD;

  constructor(
    private readonly _inventoryService: InventoryService,
    private readonly _salesService: SalesService,
    private readonly _store: Store,
  ) {}

  lastUpdated: Date = new Date();
  loading = false;

  items: InventoryModel[] = [];

  // headline figures
  totalSkus = 0;
  totalUnits = 0;
  stockValue = 0;
  avgUnitPrice = 0;

  // stock health
  healthyCount = 0;
  lowStockCount = 0;
  outOfStockCount = 0;

  // catalog spread
  categoriesCount = 0;
  brandsCount = 0;
  suppliersCount = 0;

  // detail lists
  lowStockItems: InventoryModel[] = [];
  topValueItems: ValuedItem[] = [];
  categoryStats: CategoryStat[] = [];

  // sales trend
  salesPeriod: SalesPeriod = 'week';
  salesLoading = false;
  salesBars: SalesBar[] = [];
  salesTotal = 0;

  ngOnInit(): void {
    this.loadDashboard();
    this.loadSales();
  }

  refresh(): void {
    this.loadDashboard();
    this.loadSales();
  }

  setSalesPeriod(period: SalesPeriod): void {
    if (period === this.salesPeriod) {
      return;
    }
    this.salesPeriod = period;
    this.loadSales();
  }

  get salesPeriodLabel(): string {
    return { day: 'Today', week: 'This week', month: 'This month' }[this.salesPeriod];
  }

  get inStockPct(): number { return this.pct(this.healthyCount); }
  get lowStockPct(): number { return this.pct(this.lowStockCount); }
  get outOfStockPct(): number { return this.pct(this.outOfStockCount); }

  private pct(count: number): number {
    return this.totalSkus ? (count / this.totalSkus) * 100 : 0;
  }

  private loadDashboard(): void {
    this.loading = true;
    this._store.dispatch(new ShowSpinner());

    this._inventoryService.getInventoryList().pipe(
      take(1),
      tap((resp: any) => {
        if (resp?.IsOk) {
          this.items = resp.Results[0] ?? [];
          this.computeMetrics();
          this.lastUpdated = new Date();
        }
      }),
      finalize(() => {
        this.loading = false;
        this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  private computeMetrics(): void {
    const threshold = DashboardComponent.LOW_STOCK_THRESHOLD;
    const items = this.items;

    this.totalSkus = items.length;
    this.totalUnits = items.reduce((sum, i) => sum + this.num(i.Quantity), 0);
    this.stockValue = items.reduce((sum, i) => sum + this.num(i.Quantity) * this.num(i.UnitPrice), 0);
    this.avgUnitPrice = items.length
      ? items.reduce((sum, i) => sum + this.num(i.UnitPrice), 0) / items.length
      : 0;

    this.outOfStockCount = items.filter(i => this.num(i.Quantity) <= 0).length;
    this.lowStockCount = items.filter(i => {
      const q = this.num(i.Quantity);
      return q > 0 && q <= threshold;
    }).length;
    this.healthyCount = Math.max(0, this.totalSkus - this.outOfStockCount - this.lowStockCount);

    this.categoriesCount = this.distinct(items.map(i => i.Category)).length;
    this.brandsCount = this.distinct(items.map(i => i.Brand)).length;
    this.suppliersCount = this.distinct(items.map(i => i.Supplier)).length;

    this.lowStockItems = [...items]
      .filter(i => this.num(i.Quantity) <= threshold)
      .sort((a, b) => this.num(a.Quantity) - this.num(b.Quantity))
      .slice(0, 6);

    this.topValueItems = items
      .map(i => ({ item: i, value: this.num(i.Quantity) * this.num(i.UnitPrice) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    this.categoryStats = this.buildCategoryStats(items);
  }

  private loadSales(): void {
    this.salesLoading = true;

    this._salesService.getSalesTrend(this.salesPeriod).pipe(
      take(1),
      tap((resp: any) => {
        const rows: any[] = resp?.IsOk ? (resp.Results?.[0] ?? []) : [];
        this.applySalesBars(rows);
      }),
      finalize(() => {
        this.salesLoading = false;
      })
    ).subscribe();
  }

  private applySalesBars(rows: any[]): void {
    const series = (rows ?? []).map(r => ({
      label: (r.Label ?? r.label ?? '').toString(),
      value: this.num(r.Total ?? r.total ?? r.Value ?? r.value),
    }));

    const max = series.reduce((m, s) => Math.max(m, s.value), 0);

    this.salesBars = series.map(s => ({
      ...s,
      pct: max ? (s.value / max) * 100 : 0,
    }));
    this.salesTotal = series.reduce((sum, s) => sum + s.value, 0);
  }

  private buildCategoryStats(items: InventoryModel[]): CategoryStat[] {
    const map = new Map<string, CategoryStat>();

    for (const i of items) {
      const name = (i.Category ?? '').toString().trim() || 'Uncategorized';
      const entry = map.get(name) ?? { name, skus: 0, units: 0, value: 0, share: 0 };
      entry.skus += 1;
      entry.units += this.num(i.Quantity);
      entry.value += this.num(i.Quantity) * this.num(i.UnitPrice);
      map.set(name, entry);
    }

    const stats = Array.from(map.values()).sort((a, b) => b.value - a.value);
    const maxValue = stats.reduce((m, s) => Math.max(m, s.value), 0);
    stats.forEach(s => (s.share = maxValue ? s.value / maxValue : 0));

    return stats.slice(0, 6);
  }

  private num(value: any): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private distinct(values: Array<string | null | undefined>): string[] {
    return Array.from(
      new Set(
        values
          .map(v => (v ?? '').toString().trim())
          .filter(v => v.length > 0)
      )
    );
  }
}
