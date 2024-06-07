using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class TrnInventory
{
    public int InvId { get; set; }

    public int PrdctId { get; set; }

    public string Supplier { get; set; } = null!;

    public int Qntty { get; set; }

    public int Unit { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }

    public virtual TrnProduct Prdct { get; set; } = null!;
}
