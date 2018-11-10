using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;

namespace EasyJoyResume.Utility
{
    /// <summary>
    /// 反射操作工具类
    /// </summary>
    public class ReflectionUtil
    {
        #region 根据反射机制将dataTable中指定行的数据赋给obj对象

        /// <summary>
        /// 根据反射机制将dataTable中指定行的数据赋给obj对象
        /// </summary>
        /// <param name="obj">obj对象</param>
        /// <param name="dataTable">dataTable</param>
        /// <param name="rowIndex">指定行</param>
        public static void ConvertDataRowToModel(object obj, DataTable dataTable, int rowIndex)
        {
            //指定行不存在
            if (dataTable.Rows.Count < (rowIndex + 1))
            {
                throw new Exception("指定行不存在!");
            }

            //DataTable列为空!
            if (dataTable.Columns.Count < 1)
            {
                throw new Exception("DataTable列为空!");
            }

            Type type = obj.GetType();
            PropertyInfo[] pInfos = type.GetProperties();

            try
            {
                for (int i = 0; i < dataTable.Columns.Count; i++)
                {
                    for (int j = 0; j < pInfos.Length; j++)
                    {
                        //全部转换为小写的作用是防止数据库列名的大小写和属性的大小写不一致
                        if (dataTable.Columns[i].ColumnName.ToLower() == pInfos[j].Name.ToLower())
                        {
                            PropertyInfo pInfo = type.GetProperty(pInfos[j].Name);  //obj某一属性对象

                            object colValue = dataTable.Rows[rowIndex][i]; //DataTable 列值

                            #region 将列值赋给object属性

                            if (!ObjectIsNull(colValue))
                            {
                                if (pInfos[j].PropertyType.FullName == "System.String")
                                {
                                    pInfo.SetValue(obj, Convert.ToString(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Int32")
                                {
                                    pInfo.SetValue(obj, Convert.ToInt32(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Int64")
                                {
                                    pInfo.SetValue(obj, Convert.ToInt64(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Single")
                                {
                                    pInfo.SetValue(obj, Convert.ToSingle(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Double")
                                {
                                    pInfo.SetValue(obj, Convert.ToDouble(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Decimal")
                                {
                                    pInfo.SetValue(obj, Convert.ToDecimal(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Char")
                                {
                                    pInfo.SetValue(obj, Convert.ToChar(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Boolean")
                                {
                                    pInfo.SetValue(obj, Convert.ToBoolean(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.DateTime")
                                {
                                    pInfo.SetValue(obj, Convert.ToDateTime(colValue), null);
                                }
                                //可空类型
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.DateTime, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToDateTime(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.DateTime, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToDateTime(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Int32, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToInt32(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Int32, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToInt32(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Int64, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToInt64(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Int64, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToInt64(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Decimal, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToDecimal(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Decimal, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToDecimal(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Boolean, mscorlib, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToBoolean(colValue), null);
                                }
                                else if (pInfos[j].PropertyType.FullName == "System.Nullable`1[[System.Boolean, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]")
                                {
                                    pInfo.SetValue(obj, Convert.ToBoolean(colValue), null);
                                }
                                else
                                {
                                    throw new Exception("属性包含不支持的数据类型!");
                                }
                            }
                            else
                            {
                                pInfo.SetValue(obj, null, null);
                            }

                            #endregion 将列值赋给object属性

                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //LogTxt.LogException(ex.Message + "\r\n" + ex.Source + "\r\n" + ex.TargetSite + "\r\n" + ex.StackTrace + "\r\n");
                throw ex;
            }
        }

        #endregion 根据反射机制将dataTable中指定行的数据赋给obj对象

        #region 根据反射机制从obj对象取值并用该值添加datatable行

        /// <summary>
        /// 根据反射机制从obj对象取值并用该值添加datatable行
        /// </summary>
        /// <param name="obj">obj对象</param>
        /// <param name="dataTable">dataTable</param>
        /// <param name="rowIndex">指定行</param>
        public static void ConvertModelToNewDataRow(object obj, DataTable dataTable, int rowIndex)
        {
            //DataTable列为空!
            if (dataTable.Columns.Count < 1)
            {
                throw new Exception("DataTable列为空!");
            }

            DataRow dr = dataTable.NewRow();
            Type type = obj.GetType();
            PropertyInfo[] pInfos = type.GetProperties();

            try
            {
                for (int i = 0; i < dataTable.Columns.Count; i++)
                {
                    for (int j = 0; j < pInfos.Length; j++)
                    {
                        //全部转换为小写的作用是防止数据库列名的大小写和属性的大小写不一致
                        if (dataTable.Columns[i].ColumnName.ToLower() == pInfos[j].Name.ToLower())
                        {
                            PropertyInfo pInfo = type.GetProperty(pInfos[j].Name);

                            object beanValue = pInfo.GetValue(obj, null);

                            //将bean中属性值赋给datarow
                            if (!ObjectIsNull(beanValue))
                            {
                                dr[i] = beanValue;
                            }
                            else
                            {
                                dr[i] = DBNull.Value;
                            }
                            break;
                        }
                    }
                }

                dataTable.Rows.InsertAt(dr, rowIndex);
                dataTable.AcceptChanges();
            }
            catch (Exception ex)
            {
                //LogTxt.LogException(ex.Message + "\r\n" + ex.Source + "\r\n" + ex.TargetSite + "\r\n" + ex.StackTrace + "\r\n");
                throw ex;
            }
        }

        #endregion 根据反射机制从obj对象取值并用该值添加datatable行

        #region 根据反射机制从obj对象取值并赋给datatable的指定行

        /// <summary>
        /// 根据反射机制从obj对象取值并赋给datatable的指定行
        /// </summary>
        /// <param name="obj">obj对象</param>
        /// <param name="dataTable">dataTable</param>
        /// <param name="rowIndex">指定行</param>
        public static void ConvertModelToSpecDataRow(object obj, DataTable dataTable, int rowIndex)
        {
            //指定行不存在
            if (dataTable.Rows.Count < (rowIndex + 1))
            {
                throw new Exception("指定行不存在!");
            }

            //DataTable列为空!
            if (dataTable.Columns.Count < 1)
            {
                throw new Exception("DataTable列为空!");
            }

            Type type = obj.GetType();
            PropertyInfo[] pInfos = type.GetProperties();

            try
            {
                for (int i = 0; i < dataTable.Columns.Count; i++)
                {
                    for (int j = 0; j < pInfos.Length; j++)
                    {
                        //全部转换为小写的作用是防止数据库列名的大小写和属性的大小写不一致

                        if (dataTable.Columns[i].ColumnName.ToLower() == pInfos[j].Name.ToLower())
                        {
                            PropertyInfo pInfo = type.GetProperty(pInfos[j].Name);
                            object beanValue = pInfo.GetValue(obj, null);

                            //将bean中属性值赋给datarow
                            if (!ObjectIsNull(beanValue))
                            {
                                dataTable.Rows[rowIndex][i] = beanValue;
                            }
                            else
                            {
                                dataTable.Rows[rowIndex][i] = DBNull.Value;
                            }
                            break;
                        }
                    }
                }
                dataTable.AcceptChanges();
            }
            catch (Exception ex)
            {
                //LogTxt.LogException(ex.Message + "\r\n" + ex.Source + "\r\n" + ex.TargetSite + "\r\n" + ex.StackTrace + "\r\n");
                throw ex;
            }
        }

        #endregion 根据反射机制从obj对象取值并赋给datatable的指定行

        #region 根据对象名返回类实例

        /// <summary>
        /// 根据对象名返回类实例
        /// </summary>
        /// <param name="parObjectName">对象名称</param>
        /// <returns>对象实例（可强制转换为对象实例）</returns>
        public static object GetObjectByObjectName(string parObjectName)
        {
            Type t = Type.GetType(parObjectName); //找到对象
            return System.Activator.CreateInstance(t);         //实例化对象
        }

        #endregion 根据对象名返回类实例

        #region 判断对象是否为空

        /// <summary>
        /// 判断对象是否为空
        /// </summary>
        /// <param name="obj">对象</param>
        /// <returns></returns>
        static public bool ObjectIsNull(Object obj)
        {
            //如果对象引用为null 或者 对象值为null 或者对象值为空
            if (obj == null || obj == DBNull.Value || obj.ToString().Equals("") || obj.ToString() == "")
            {
                return true;
            }
            return false;
        }

        #endregion 判断对象是否为空

        #region 根据反射机制将DataTable转换为实体集合。

        /// <summary>
        /// 根据反射机制将DataTable转换为实体集合。
        /// </summary>
        /// <typeparam name="T">实体类型。</typeparam>
        /// <param name="dt">DataTable。</param>
        /// <returns>实体集合。</returns>
        public static List<T> ConvertDataTableToModelList<T>(DataTable dt)
        {
            if (dt == null)
            {
                return null;
            }
            List<T> result = new List<T>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                T t = Activator.CreateInstance<T>();
                ConvertDataRowToModel(t, dt, i);
                result.Add(t);
            }
            return result;
        }

        #endregion 根据反射机制将DataTable转换为实体集合。

        /// <summary>
        /// 通用（调用对象方法前先new一遍对象，故对象的状态无法保留；无用有无参构造函数，并调用无参方法），
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="methodName"></param>
        public static void InvokeMethod<T>(string methodName, object[] param = null) where T : new()
        {
            T instance = new T();
            MethodInfo method = typeof(T).GetMethod(methodName);
            method.Invoke(instance, param);
        }

        /// <summary>
        /// 调用一个具体实例对象的方法，会保留对象状态
        /// </summary>
        /// <param name="o"></param>
        /// <param name="methodName"></param>
        public static void InvokeMethod(object o, string methodName, object[] param = null)
        {
            o.GetType().GetMethod(methodName).Invoke(o, param);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="nameOfProperty"></param>
        /// <returns></returns>
        public static object GetObjValues (object obj,string nameOfProperty) { 
            var propertyInfo = obj.GetType().GetProperty(nameOfProperty);
            return propertyInfo.GetValue(obj, null);
        }

        public static object SetObjValues(object obj, string name,string val)
        { 
            Type type = obj.GetType(); //获取类型
            System.Reflection.PropertyInfo propertyInfo = type.GetProperty(name); //获取指定名称的属性 
            propertyInfo.SetValue(obj, val, null); //给对应属性赋值 
            return obj;
        }
    }
}