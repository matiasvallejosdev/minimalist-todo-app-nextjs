
export const getPerformedTitle = (slug) => {
    const title = slug.toString().replaceAll("-", " ")
    return title.charAt(0).toUpperCase() + title.slice(1)
}