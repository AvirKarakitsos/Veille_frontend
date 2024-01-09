
export function validatePath(data, value) {
    return data.some((element) => element.name === value)
}
 