using AutoMapper;

namespace Application.IFactory
{
    public interface IAbstractServiceFactory
    {
        public IMapper Mapper();
    }
}
