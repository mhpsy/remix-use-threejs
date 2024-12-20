import { useSubmit, useSearchParams } from "@remix-run/react";

export default function ConcertsNewIndex() {
    const [searchParams] = useSearchParams();
    const submit = useSubmit();
    const view = searchParams.get("view") || "list";
    const sort = searchParams.get("sort");

    const handleSort = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (sort === "asc") {
            newSearchParams.delete("sort");
        } else {
            newSearchParams.set("sort", "asc");
        }
        submit(newSearchParams);
    };

    return (
        <div>
            <button name="view" value="list" onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("view", "list");
                submit(newSearchParams);
            }}>
                列表
            </button>
            <button name="view" value="details" onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.set("view", "details");
                submit(newSearchParams);
            }}>
                详情
            </button>
            <button onClick={handleSort}>
                {sort === "asc" ? "取消排序" : "升序排序"}
            </button>
            {view === "list" ? <div>list</div> : <div>details</div>}
        </div>
    );
}
