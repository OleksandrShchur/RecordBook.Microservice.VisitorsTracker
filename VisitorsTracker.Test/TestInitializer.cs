using AutoMapper;
using Moq;
using NUnit.Framework;
using VisitorsTracker.Db.EFCore;

namespace VisitorsTracker.Test
{
    [TestFixture]
    public abstract class TestInitializer
    {
        protected static Mock<IMapper> MockMapper { get; set; }

        protected AppDbContext Context { get; set; }

        [SetUp]
        protected virtual void Initialize()
        {
            MockMapper = new Mock<IMapper>();
            var factory = new ConnectioFactory();
            Context = factory.CreateContextForInMemory();
            TestContext.WriteLine("Initialize test data");
        }

        [TearDown]
        protected virtual void Cleanup()
        {
            TestContext.WriteLine("Cleanup test data");
            Context.Dispose();
        }
    }
}
