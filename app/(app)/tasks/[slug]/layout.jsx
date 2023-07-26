
export default async function ListLayout({ children, params, props }){
    const { slug } = params
    return( <>
            <h4>{slug.toString().replaceAll("%20", " ")}</h4>
            {children}
        </>
    )
}