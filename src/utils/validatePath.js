
export function validatePathName(data, value) {
    return data.some((element) => element.name === value)
}

export function validatePathId(data, value) {
    return data.some((element) => element._id === value)
}
 