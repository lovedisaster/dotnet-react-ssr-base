using System.Collections.Generic;


namespace SSRBase.LandingPage.Models
{
    public class HomeViewModel
    {
        public SSRViewModel SSRViewModel { get; set; }
        public string TrackingScript { get; set; }
    }

    public class SSRViewModel
    {
        public string DeviceType { get; set; }
        public string SourceSystem { get; set; }
        public string ComebackFrom { get; set; }
    }
}