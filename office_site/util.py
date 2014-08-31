
import MySQLdb

def condb():
    try:
        conn = MySQLdb.connect(host='localhost', user='root', passwd='891130', db='office_work', charset='utf8')
    except:
        print 'connect error'
    return conn


def check_login(name, passwd):
    SQL_string = 'select password from office_login where name = \'%s\' ' % name
    conn = condb()
    cursor = conn.cursor()
    cursor.execute(SQL_string)
    pw = cursor.fetchone()
    have = True
    if str(pw) != passwd:
        have = False
    cursor.close()
    conn.close()
    return have

def office_add_person(items):
    conn = condb()
    cursor = conn.cursor()

def test_mysql():
    conn = condb()

    SQL_string = "insert into office_user_item(workid,name,region,phone,decription) values( '000','admin', 'A', '000', 'admin!')"
    #SQL_string = "select * from office_login"
    cursor = conn.cursor()
    n = cursor.execute(SQL_string)
    cursor.close()
    conn.close()
if __name__ == '__main__':
    test_mysql()
