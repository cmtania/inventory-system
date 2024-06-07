using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class BasCategory
{
    public int CtgryId { get; set; }

    public string CtgryCd { get; set; } = null!;

    public string Label { get; set; } = null!;

    public string? Rmrks { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }

    public virtual ICollection<TrnProduct> TrnProducts { get; set; } = new List<TrnProduct>();
}
