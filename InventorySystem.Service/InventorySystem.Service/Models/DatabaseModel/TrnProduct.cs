using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class TrnProduct
{
    public int PrdctId { get; set; }

    public string PrdctCd { get; set; } = null!;

    public string PrdctNm { get; set; } = null!;

    public string? PrdctDscrptn { get; set; }

    public double UntPrc { get; set; }

    public int CtgryId { get; set; }

    public int BrndId { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }

    public virtual BasBrand Brnd { get; set; } = null!;

    public virtual BasCategory Ctgry { get; set; } = null!;

    public virtual ICollection<TrnInventory> TrnInventories { get; set; } = new List<TrnInventory>();

    public virtual ICollection<TrnTransaction> TrnTransactions { get; set; } = new List<TrnTransaction>();
}
