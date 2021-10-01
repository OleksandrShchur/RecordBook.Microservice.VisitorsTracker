using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;
using AutoMapper;

namespace VisitorsTracker.Web.Mapping
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile()
        {
            CreateMap<User, UserProfileViewModel>();

            CreateMap<User, UserLoginViewModel>();

            CreateMap<UserProfileViewModel, User>();

            CreateMap<UserLoginViewModel, User>();
        }
    }
}
