export const groupBy = (items, key, subKey) => {
    let array = items.map(item => item[key])
        .filter((value, index, self) => self.indexOf(value) === index)
    let group = [];
    array.forEach(element => {
        const object = {
            [key]: element,
            [subKey]: items.filter((value) => value[key] === element)
        }
        group.push(object)
    });
    return group;
};

export function getPrice (price, discountPrice) {
    return discountPrice < price && discountPrice > 0 ? discountPrice : price
}