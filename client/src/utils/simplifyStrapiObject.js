export const simplifyStrapiObject = obj => {

    obj = JSON.parse(JSON.stringify(obj))

    if (obj.data && obj.data.attributes !== undefined) {
        Object.assign(obj, obj.data.attributes);
        obj.id = obj.data.id;
        delete obj.data;
        delete obj.meta;
    }
    if (obj.attributes) {
        Object.assign(obj, obj.attributes);
        delete obj.attributes;
    }

    const relationships = Object.keys(obj).filter(key => key !== 'data');
    relationships.forEach(relationship => {
        const children = obj[relationship];
        if (Array.isArray(children?.data) && children.data?.length > 0) {
            const mapped = children.data.map(child => simplifyStrapiObject(child))
            obj[relationship] = mapped;
        } else if (children?.data !== undefined) {
            obj[relationship] = simplifyStrapiObject(children)
        }
    });
    return obj;
}