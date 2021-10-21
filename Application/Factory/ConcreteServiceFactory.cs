using Application.IFactory;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Factory
{
    public class ConcreteServiceFactory : IAbstractServiceFactory
    {
        public IMapper Mapper { get; }
        public ConcreteServiceFactory(IMapper mapper)
        {
            Mapper = mapper;
        }

        IMapper IAbstractServiceFactory.Mapper()
        {
            return Mapper;
        }

    }
}
