using System;

namespace EasyFinance.Models
{
    public class Receipt
    {
        public int Id { get; set; }

        public int? PhotoId { get; set; }

        public int CategoryId { get; set; }

        public string PaymentMethod { get; set; }

        public decimal? TotalAmount { get; set; }

        public int CurrencyId { get; set; }

        public DateTime? PurchaseDate { get; set; }
    }
}
