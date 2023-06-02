const test = JSON.parse(`{
    "cPositionStages": {
      "data": [
        {
          "id": "3",
          "attributes": {
            "position": {
              "data": {
                "id": "15",
                "attributes": {
                  "title": "Карандаш 111"
                }
              }
            },
            "comments": {
              "data": [
                {
                  "attributes": {
                    "descr": "еще коммент"
                  }
                }
              ]
            }
          }
        },
        {
          "id": "6",
          "attributes": {
            "position": {
              "data": {
                "id": "14",
                "attributes": {
                  "title": "Карандаш  чернографитовый,  с металлическим ..."
                }
              }
            },
            "comments": {
              "data": [
                {
                  "attributes": {
                    "descr": "какойто комментарий"
                  }
                }
              ]
            }
          }
        }
      ]
    }
}`
)

// let result;
// let prevKey;

// const getChildern = (tree) => {



//     if (Array.isArray(tree)) {
//         return tree
//     } else if (typeof tree == 'object') {

//         const key = Object.keys(tree)[0];

//         if (key == 'data' || key == 'attributes') {
//             result[prevKey] = Object.values(tree)
//         }


//         prevKey = key;

//         if (!result) {
//             result = {}
//             result[key] = {}
//         }
 

//         return Object.values(tree)
//     } else {
//         return null
//     }

//   /* return Object.entries(tree)[0][1] */;
// }

// const dfs = (tree) => {


//     const children = getChildern(tree);

//     if (children) {
//         /* console.log('=>>', ...children) */
//     }



//     if (!children) return

//     children.forEach(x => dfs(x))

// };

// dfs(test);


const simplifyStrapiObject = obj => {
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