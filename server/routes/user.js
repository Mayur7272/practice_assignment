const express=require('express')
const db=require('../db')
const utils=require('../utils')
const router=express.Router()

router.get('/getAll/',(request,response)=>{
    const statement=`select * from emp`
    const connection1=db.openConnection()
    connection1.query(statement,(error,result)=>{
        if(error){
            response.send(utils.createResult(error,null))
        }else{
            response.send(utils.createResult(null,result))
        }
    })

})

router.post('/add/',(request,response)=>{
    const {empid,name,salary,age}=request.body
    const statement=`SELECT * FROM emp WHERE empid=${empid}`
    const connection=db.openConnection()
    connection.query(statement,(error,data)=>{
        if(error){
            console.log(error)
            response.send(utils.createResult(error))
        }
        else{
            if(data.length==0){
                const statement=`insert into emp values('${empid}','${name}','${salary}','${age}')`
                connection.query(statement,(error,data)=>{
                    if(error){
                        response.send('error')
                    }else{
                        response.send(data)
                    }
                })
            }else{
                response.send('employee with this id is already present')
            }
        }
    })
})

router.get('/getById/:id',(request,response)=>{
    const empid=request.params.id
    const statement=`select * from emp where empid='${empid}'`
    const connection1=db.openConnection()
    connection1.query(statement,(error,result)=>{
        if(error){
            response.send('error while executing query')
        }else{
            if(result.length==0){
                response.send('no data found with given id')
            }else{
                response.send(result)
            }
            
        }
    })

})

router.put('/update/',(request,response)=>{
    const {empid,salary}=request.body
    const statement=`SELECT * FROM emp WHERE empid='${empid}'`
    const connection=db.openConnection()
    connection.query(statement,(error,data)=>{
        if(error){
            response.send('error in query')
        }
        else{
            if(data.length==0){
                response.send('employee with this id is already present')
            }else{
                const statement=`update emp set salary='${salary}' where empid='${empid}'`
                connection.query(statement,(error,data)=>{
                    if(error){
                        response.send('error')
                    }else{
                        response.send(data)
                    }
                })
                
            }
        }
    })
})

router.delete('/delete/:id',(request,response)=>{
    const empid=request.params.id
    const statement=`SELECT * FROM emp WHERE empid='${empid}'`
    const connection=db.openConnection()
    connection.query(statement,(error,data)=>{
        if(error){
            response.send('error in query')
        }
        else{
            if(data.length==0){
                response.send('employee with this id is already present')
            }else{
                const statement=`delete from emp where empid='${empid}'`
                connection.query(statement,(error,data)=>{
                    if(error){
                        response.send('error')
                    }else{
                        response.send(data)
                    }
                })
                
            }
        }
    })
})

module.exports=router
