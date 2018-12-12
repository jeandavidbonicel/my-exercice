
export function findUserBySuggestion (data, suggestion) {
    return data.filter(element => {
        return element.username.toLowerCase().startsWith(suggestion.toLowerCase())
    })
}

