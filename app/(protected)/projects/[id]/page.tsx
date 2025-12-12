import ProjectDetails from "@/components/ProjectDetails";
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <ProjectDetails id={id} />
    </div>
  );
};

export default page;
