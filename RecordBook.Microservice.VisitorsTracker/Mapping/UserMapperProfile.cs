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
                .ForMember(dest => dest.Roles,
                    opt => opt.MapFrom(src => src.UserRoles.Select(
                        x => new RoleItemViewModel() { Id = x.Role.Id, Name = x.Role.Name }).ToList()))
                .ForMember(dest => dest.Birthday, opt => opt.MapFrom(src => src.Birthday.Date))
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.PhotoUrl));

            CreateMap<User, UserLoginViewModel>();

            CreateMap<User, UserCreateViewModel>();

            CreateMap<UserProfileViewModel, User>();

            CreateMap<UserLoginViewModel, User>();

            CreateMap<UserCreateViewModel, User>();

            CreateMap<UserRole, UserProfileViewModel>();

            CreateMap<UserRole, Role>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore());

            CreateMap<Role, UserRole>();

            CreateMap<User, UserListViewModel>()
                .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.PhotoUrl))
                .ForMember(dest => dest.Roles,
                    opt => opt.MapFrom(src => src.UserRoles.Select(
                        x => new RoleItemViewModel() { Id = x.Role.Id, Name = x.Role.Name }).ToList()));

            CreateMap<UserListViewModel, User>();
        }
    }
}
