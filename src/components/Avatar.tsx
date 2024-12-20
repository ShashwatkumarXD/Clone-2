export default function Avatar({
     src, 
    }:{
         src: string; 
        }) {
    return (
        <div className="size-12 aspect-square overflow-hidden rounded-full">
            <img
                className=""
                src={src}
                alt="" />
        </div>
    );
}