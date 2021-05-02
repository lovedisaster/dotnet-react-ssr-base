using SSRBase.LandingPage.Models;
using Microsoft.AspNetCore.Mvc;

namespace SSRBase.LandingPage.Controllers
{
    [Route("ssrBase")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {

            var response = new HomeViewModel()
            {
                SSRViewModel = new SSRViewModel()
                {
                    DeviceType = "Desktop",
                    SourceSystem = "Test"
                }
            };
            return View(response);
        }
    }
}
