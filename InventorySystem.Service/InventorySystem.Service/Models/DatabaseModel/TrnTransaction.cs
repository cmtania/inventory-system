using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class TrnTransaction
{
    public int TrnId { get; set; }

    public int SlsId { get; set; }

    public int PrdctId { get; set; }

    public int Qntty { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }

    public virtual TrnProduct Prdct { get; set; } = null!;

    public virtual TrnSale Sls { get; set; } = null!;
}
