const database = require("../database/connection")

class ReportsController {
    novoRelatorio(request, response){
        
        const {data, hora, umidade, temperatura} = request.body

        console.log(data, hora, umidade, temperatura)

        database.insert({data, hora, umidade, temperatura}).table("reports").then(data=>{
            console.log(data)
            response.json({message:"Relatório criado com sucesso !"})
        }).catch(error=>{
            console.log(error)
        })
    } 

    listarRelatorios(request,response){
        database.select("*").table("reports").then(relatorios=>{
            console.log(relatorios)
            response.json(relatorios)
        }).catch(error=>{
            console.log(error)
        })
    }

    listarUmRelatorio(request,response){
        const id = request.params

        database.select("*").table("reports").where({id:id}).then(relatorios=>{
            response.json(relatorios)

        }).catch(error=>{
            console.log(error)
        })

    }

    atualizarRelatorio(request,response){
        const id = request.params
        const {descricao} = request.body

        database.where({id:id}).update({descricao:descricao}).table("reports").then(data=>{
            response.json({message:"Relatório atualizado com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }

    removerRelatorio(request,response){
        const id = request.params

        database.where({id:id}).table("reports").then(data=>{
            response.json({message: "Relatório removido com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }

}

module.exports = new ReportsController()