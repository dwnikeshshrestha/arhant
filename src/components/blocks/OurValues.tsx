import HeadingTypography from "../HeadingTypography";
import ContainerLayout from "../layout/ContainerLayout";
import DescriptionTypography from "../DescriptionTypography";

const values = [
  {
    title: "Be world-class",
    description:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
  },
  {
    title: "Share everything you know",
    description:
      "Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
  },
  {
    title: "Always learning",
    description:
      "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
  },
  {
    title: "Be supportive",
    description:
      "Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non autem laudantium modi. Praesentium rerum error deserunt harum.",
  },
  {
    title: "Take responsibility",
    description:
      "Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.",
  },
  {
    title: "Enjoy downtime",
    description:
      "Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.",
  },
];

export default function OurValues() {
  return (
    <ContainerLayout>
      {/* Header */}
      <div className="mb-12">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-primary"></span>
            Our values
          </h2>
        <HeadingTypography className="mb-4">Our values of company</HeadingTypography>
        <DescriptionTypography className="max-w-lg">
          Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
          voluptatum cupiditate veritatis in accusamus quisquam.
        </DescriptionTypography>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
        {values.map((value) => (
          <div key={value.title}>
            <h3 className="font-semibold text-sm mb-2">
              {value.title}
            </h3>
            {/* <p className="text-gray-500 text-sm leading-relaxed">
              {value.description}
            </p> */}
              <DescriptionTypography className="text-sm ">
              {value.description}

</DescriptionTypography>
          </div>
        ))}
      </div>
    </ContainerLayout>
  );
}
