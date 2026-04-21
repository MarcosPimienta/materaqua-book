import { useBookStore } from "../../store/useBookStore";
import { PageModel } from "./PageModel";

export const Book = () => {
  const currentPage = useBookStore((state) => state.currentPage);
  const totalPages = 7;

  return (
    <group name="Book_Container">
      {/* Pages will be rendered here */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <PageModel
          key={index}
          index={index}
          currentPage={currentPage}
          modelPath={`/models/page_${index + 1}.glb`}
        />
      ))}
    </group>
  );
};
