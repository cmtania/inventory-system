using System;
using System.Collections.Generic;

namespace InventorySystem.Service.Models.DatabaseModel;

public partial class TrnSale
{
    public int SlsId { get; set; }

    public int PymntTypId { get; set; }

    public double RcvdAmnt { get; set; }

    public double ChngDue { get; set; }

    public DateTime CrtDt { get; set; }

    public string CrtBy { get; set; } = null!;

    public DateTime UpdtDt { get; set; }

    public string UpdtBy { get; set; } = null!;

    public bool Purge { get; set; }

    public virtual BasPaymentType PymntTyp { get; set; } = null!;

    public virtual ICollection<TrnTransaction> TrnTransactions { get; set; } = new List<TrnTransaction>();
}
