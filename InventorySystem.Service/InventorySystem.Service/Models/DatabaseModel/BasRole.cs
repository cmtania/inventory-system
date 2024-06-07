using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class BasRole
{
    public int RlId { get; set; }

    public string RlCd { get; set; } = null!;

    public string RlNm { get; set; } = null!;

    public string? Rmrks { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }
}
