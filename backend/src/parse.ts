interface Item {
  index: number,
  name: string | null,
  description: string | null,
  reverse_depend_ids: number[],
  depend_ids: number[],
  depends?: string[][],
};

interface Dictionary {
  [key: string]: number;
}

// a dictionary to map package name to index number
const itemDict: Dictionary = {};


const parseItem = (itemStr: string, index: number) => {
  const item: Item = {
    index,
    name: '',
    description: '',
    reverse_depend_ids: [],
    depend_ids: [],
    depends: [],
  };

  // Find name
  item.name = itemStr.match(/(?<=Package: ).+/)[0];
  itemDict[item.name] = index;

  // Find description
  const descriptionSearch = itemStr.match(/(?<=Description: )[\s\S]+?(?=\n[A-Z])/);
  // Replace \n with <br/>
  item.description = descriptionSearch && descriptionSearch[0].replace('\n', '<br/>');

  // Format dependencies, remove version
  const dependsSearch = itemStr.match(/(?<=Depends: ).+/);
  if (dependsSearch) {
    const dependsList = dependsSearch[0].split(', ');
    item.depends = dependsList.map((depend) => {
      return depend.replace(/ \(.+\)/, '')
        .split(' | ');
    })

    // depends is a list of list of packages
    // i.e [['python', 'perl'], ['python', 'xml']]
  }

  return item;
}

const calculateReverseDependencies = (items: Item[]) => {
  items.forEach((item, index) => {
    item.depends.forEach((depend) => {
      // depend is a list of packages, i.e ['python', 'perl']
      depend.forEach((itemName) => {
        if (itemDict[itemName]) {
          items[itemDict[itemName]].reverse_depend_ids.push(index);
        }
      });
    });
  });

  // Remove duplication
  items.forEach((item) => {
    item.reverse_depend_ids = [...new Set(item.reverse_depend_ids)];
  });
}

const formatDependencies = (items: Item[]) => {
  // Replace dependency by its ID and remove duplication
  items.forEach((item, index) => {
    item.depend_ids = item.depends.map((depend) => {
        // Replace by ID
        const itemIds = depend.filter(itemName => itemDict[itemName])
          .map(itemName => itemDict[itemName]);
        return itemIds;
      })
      .filter(itemIds => itemIds.length > 0)
      .map(itemIds => itemIds[0]);

    item.depend_ids = [...new Set(item.depend_ids)];
    delete item.depends;
  });
}

export const parseStatus = (statusStr: string) => {
  const rawItems = statusStr.split('\n\n')
    .filter(item => item.startsWith('Package'));

    const items = rawItems.map(parseItem);
    calculateReverseDependencies(items);
    formatDependencies(items);

    return items;
}
