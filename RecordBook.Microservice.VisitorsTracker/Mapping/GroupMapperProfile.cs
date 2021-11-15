using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisitorsTracker.Shared.Entities;
using VisitorsTracker.Shared.ViewModels;

namespace VisitorsTracker.Web.Mapping
{
    public class GroupMapperProfile : Profile
    {
        public GroupMapperProfile()
        {
            CreateMap<UserGroup, GroupItemViewModel>();

            CreateMap<GroupItemViewModel, UserGroup>();

            CreateMap<Group, GroupListViewModel>();

            CreateMap<GroupListViewModel, Group>();
        }
    }
}
