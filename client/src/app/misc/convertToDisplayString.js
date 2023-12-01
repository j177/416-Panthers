export const convertToDisplayString = (name) => {
    return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2')
}