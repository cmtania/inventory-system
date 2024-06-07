using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class TrnUser
{
    public int UsrId { get; set; }

    public int RlId { get; set; }

    public string UsrNm { get; set; } = null!;

    public string Pswrd { get; set; } = null!;

    public string FrstNm { get; set; } = null!;

    public string LstNm { get; set; } = null!;

    public string? Email { get; set; }

    public string? PhnNum { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }
}
