
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
const orders = []
app.use(express.json())


const logRequest = (request, response, next) => {
    console.log(`Request [${request.method}] ${request.url}`)
    next()
}

app.use(logRequest)

const getOrderId = (request,response,next)=>{
    const {id}= request.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ message: 'order Not Found' })
    }
    request.orderIndex = index
    request.orderId = id

    next()
}

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.post('/order', (request, response) => {
    const { order, clientName, price, status } = request.body
    const ped = { id: uuid.v4(), order, clientName, price, status }

    orders.push(ped)

    return response.status(201).json(ped);
})

app.put('/order/:id', getOrderId , (request, response) => {
    
    const { order, clientName, price, status } = request.body
    const ped = { id:request.orderId, order, clientName, price, status }
 
    orders[request.orderIndex] = ped

    return response.status(201).json(ped)
})

app.delete('/order/:id', getOrderId , (request, response) => {
  
    orders.splice(request.orderIndex, 1)

    return response.status(202).json()
})

app.get('/order/:id', getOrderId , (request, response) => {    

    return response.json(orders[request.orderIndex])
})

app.patch('/order/:id', getOrderId , (request, response) => {
  
    orders[request.orderIndex].status="Pronto"

    return response.status(202).json()
})




app.listen(port, () => {
    console.log(`server started on ${port}`)
})