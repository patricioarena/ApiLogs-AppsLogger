using System.Collections.Generic;

namespace DataAccess.Helper
{
    public interface IDbManager
    {
        T ExecuteSingle<T>(string procedureName) where T : new();
        T ExecuteSingle<T>(string procedureName, List<DbParameter> parameters) where T : new();
        List<T> ExecuteList<T>(string procedureName) where T : new();
        List<T> ExecuteList<T>(string procedureName, List<DbParameter> parameters) where T : new();
        int ExecuteNonQuery(string procedureName, List<DbParameter> parameters);
        //List<Rol> ExecuteTable();
        List<DbParameter> OutParameters { get; set; }
    }
}
