const saveData = (data) => {
    const storedData = JSON.parse(localStorage.getItem('sectionData')) !== undefined ? JSON.parse(localStorage.getItem('sectionData')) : {};
    const json = {
        ...storedData,
        [data[0].sectionId]: {
            header: data[0].sectionName,
            layout: data[0].layout,
            data: [...data]}
    }
    localStorage.setItem('sectionData', JSON.stringify(json))

}

const loadData = (section) => {
    const storedData = JSON.parse(localStorage.getItem('sectionData')) !== undefined ? JSON.parse(localStorage.getItem('sectionData')) : {};
    return storedData[section].data;
}


const deleteData = (section) => {
    let storedData = JSON.parse(localStorage.getItem('sectionData')) !== undefined ? JSON.parse(localStorage.getItem('sectionData')) : {};
    delete storedData[section]
    localStorage.setItem('sectionData', JSON.stringify(storedData))
}

const getSections = () => {
    const storedData = JSON.parse(localStorage.getItem('sectionData')) !== undefined ? JSON.parse(localStorage.getItem('sectionData')) : {};
    if(storedData === null || storedData === undefined){
        return []
    } else {
        const navlinks = Object.keys(storedData).map((d) => {
            return {id: d, name: storedData[d].header, layout: storedData[d].layout}
        })
        return navlinks;
    }

}

export {saveData, loadData, deleteData, getSections}
