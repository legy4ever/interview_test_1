export const createQuery = "CREATE TABLE candidatos ( id varchar(100) , name varchar(100), skills varchar[]);"
export const insertQuery = "INSERT INTO candidatos (id , name, skills) VALUES (?,?,?);"
export const selectQuery = "SELECT * FROM candidatos;"