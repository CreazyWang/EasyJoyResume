using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data;

namespace EasyJoyResume.DAL
{
    public class DalBase<T> where T : class
    {
        private DbContext db = new Models.EasyJoy589452Entities();
        //public IDbSession _DbSession = DbSessionFactory.GetCurrenntDbSession();
        /// <summary>
        /// 新增实体
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public T AddEntity(T entity)
        {
            db.Entry<T>(entity).State = EntityState.Added;
            //下面的写法统一
            db.SaveChanges();
            return entity;
        }
        /// <summary>
        /// 实现对数据库的修改功能
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool UpdateEntity(T entity)
        {
            db.Entry<T>(entity).State = EntityState.Modified;
            return db.SaveChanges() > 0;
        }

        /// <summary>
        /// 实现对数据库的删除功能
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool DeleteEntity(T entity)
        {
            //EF5.0的写法
            db.Set<T>().Attach(entity);
            db.Entry<T>(entity).State = EntityState.Deleted;
            return db.SaveChanges() > 0;
        }

        /// <summary>
        /// 实现对数据库的查询  --简单查询
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        public IQueryable<T> LoadEntities(Expression<Func<T, bool>> whereLambda)
        {
            //EF4.0的写法
            //return db.CreateObjectSet<T>().Where<T>(whereLambda).AsQueryable();
            //EF5.0的写法
            return db.Set<T>().Where<T>(whereLambda).AsQueryable();
        }

        /// <summary>
        /// 实现对数据的分页查询
        /// </summary>
        /// <typeparam name="S">按照某个类进行排序</typeparam>
        /// <param name="pageIndex">当前第几页</param>
        /// <param name="pageSize">一页显示多少条数据</param>
        /// <param name="total">总条数</param>
        /// <param name="whereLambda">取得排序的条件</param>
        /// <param name="isAsc">如何排序，根据倒叙还是升序</param>
        /// <param name="orderByLambda">根据那个字段进行排序</param>
        /// <returns></returns>
        public IQueryable<T> LoadPageEntities<S>(int pageIndex, int pageSize, out int total, Expression<Func<T, bool>> whereLambda,
                                                 bool isAsc, Expression<Func<T, S>> orderByLambda)
        {
            //EF4.0和上面的查询一样
            //EF5.0
            var temp = db.Set<T>().Where<T>(whereLambda);
            total = temp.Count(); //得到总的条数
            //排序,获取当前页的数据
            if (isAsc)
            {
                temp = temp.OrderBy<T, S>(orderByLambda)
                    .Skip<T>(pageSize * (pageIndex - 1)) //越过多少条
                    .Take<T>(pageSize).AsQueryable(); //取出多少条
            }
            else
            {
                temp = temp.OrderByDescending<T, S>(orderByLambda)
                    .Skip<T>(pageSize * (pageIndex - 1)) //越过多少条
                    .Take<T>(pageSize).AsQueryable(); //取出多少条
            }
            return temp.AsQueryable();
        }

        public Expression<Func<T, To>> GetSortExpression<T, To>(String sortBy)
        {
            var param = Expression.Parameter(typeof(T), "x");
            Expression expr = Expression.Property(param, sortBy);
            return Expression.Lambda<Func<T, To>>(expr, param);
        }

        //public IQueryable<T> SortList(IQueryable<T> q, QueryBase pq)
        //{
        //    var propertyType = typeof(T).GetProperty(pq.SortField).PropertyType;
        //    var sortField = pq.SortField;
        //    if (pq.Direction.ToUpper() == "ASC")
        //    {
        //        if (propertyType == typeof(bool))
        //        {

        //            q = q.OrderBy(GetSortExpression<T, bool>(sortField));
        //        }
        //        else if (propertyType == typeof(int))
        //        {
        //            q = q.OrderBy(GetSortExpression<T, int>(sortField));
        //        }
        //        else if (propertyType == typeof(int?))
        //        {
        //            q = q.OrderBy(GetSortExpression<T, int?>(sortField));
        //        }
        //        else if (propertyType == typeof(DateTime))
        //        {
        //            q = q.OrderBy(GetSortExpression<T, DateTime>(sortField));
        //        }

        //        else if (propertyType == typeof(DateTime?))
        //        {
        //            q = q.OrderBy(GetSortExpression<T, DateTime?>(sortField));
        //        }
        //        else
        //        {
        //            q = q.OrderBy(GetSortExpression<T, object>(sortField));
        //        }
        //    }
        //    else
        //    {
        //        if (propertyType == typeof(bool))
        //        {
        //            q = q.OrderByDescending(GetSortExpression<T, bool>(sortField));
        //        }
        //        else if (propertyType == typeof(int))
        //        {
        //            q = q.OrderByDescending(GetSortExpression<T, int>(sortField));
        //        }
        //        else if (propertyType == typeof(int?))
        //        {
        //            q = q.OrderByDescending(GetSortExpression<T, int?>(sortField));
        //        }
        //        else if (propertyType == typeof(DateTime))
        //        {
        //            q = q.OrderByDescending(GetSortExpression<T, DateTime>(sortField));
        //        }
        //        else if (propertyType == typeof(DateTime?))
        //        {
        //            q = q.OrderByDescending(GetSortExpression<T, DateTime?>(sortField));
        //        }
        //        else
        //        {
        //            q = q.OrderByDescending(GetSortExpression<T, object>(sortField));
        //        }
        //    }
        //    return q;
        //}
    }
}