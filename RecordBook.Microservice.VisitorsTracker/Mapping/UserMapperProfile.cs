using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;
using AutoMapper;
using System.Linq;

namespace VisitorsTracker.Web.Mapping
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            CreateMap<User, UserProfileViewModel>()
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.UserRoles.Select(x => x.Role.Name)));

            CreateMap<User, UserLoginViewModel>();

            CreateMap<User, UserCreateViewModel>();

            CreateMap<UserProfileViewModel, User>();

            CreateMap<UserLoginViewModel, User>();

            CreateMap<UserCreateViewModel, User>();

            CreateMap<UserRole, UserProfileViewModel>();

            CreateMap<UserRole, Role>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore());

            CreateMap<Role, UserRole>();
        }
    }
}
