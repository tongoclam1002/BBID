export const groupBy = (items, key) => {
    let array = items.map(item => item[key])
        .filter((value, index, self) => self.indexOf(value) === index)
    let group = [];
    array.forEach(element => {
        const object = {
            [key]: element,
            list: items.filter((value, index, self) => value[key] == element)
        }
        group.push(object)
    });
    return group;
};