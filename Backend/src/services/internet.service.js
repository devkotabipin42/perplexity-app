import {tavily as Tavily} from "@tavily/core"

const tavily= tavily({
    apiKey:process.env.TAVILY_API_KEY
})

export const searchInternet = async (query)=>{
    return tavily.search(query,{
        maxResults:5,
        searchDepth:'advanced'
    })
}