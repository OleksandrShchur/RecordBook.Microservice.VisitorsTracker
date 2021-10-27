using AutoMapper;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Web.Mapping
{
    public class RoleMapperProfile : Profile
    {
        public RoleMapperProfile()
        {
            CreateMap<Role, RoleItemViewModel>();

            CreateMap<RoleItemViewModel, Role>();
        }
    }
}
