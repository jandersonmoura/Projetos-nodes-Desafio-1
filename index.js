const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
const orders = []
app.use(express.json())

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.post('/order', (request, response) => {
    const { order, clientName, price, status } = request.body
    const ped = { id: uuid.v4(), order, clientName, price, status }

    orders.push(ped)

    return response.status(201).json(ped);
})

app.put('/order/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body
    const ped = { id, order, clientName, price, status }
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ message: 'order Not Found' })
    }
    orders[index] = ped

    return response.status(201).json(ped)
})

app.delete('/order/:id', (request, response) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ message: 'order Not Found' })
    }
    orders.splice(index, 1)

    return response.status(202).json()
})

app.get('/order/:id', (request, response) => {
    const { id } = request.params
    
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ message: 'order Not Found' })
    }
    

    return response.json(orders[index])


})

app.patch('/order/:id', (request, response) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ message: 'order Not Found' })
    }
    orders[index].status="Pronto"

    return response.status(202).json()
})




app.listen(port, () => {
    console.log(`server started on ${port}`)
})