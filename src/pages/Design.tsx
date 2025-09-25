import { Text } from "../components/Text";

export const DesignPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Design System</h1>
      <p className="mb-6">
        This page showcases the design system used in this project, including typography, colors, and spacing.
      </p>

      {/* // add all Text variants here for demonstration */}
      <Text variant="h1" className="mb-4">Heading 1</Text>
      <Text variant="h2" className="mb-4">Heading 2</Text>
      <Text variant="h3" className="mb-4">Heading 3</Text>
      <Text variant="h4" className="mb-4">Heading 4</Text>
      <Text variant="s1" className="mb-4">Subtitle 1: Lorem ipsum dolor sit amet.</Text>
      <Text variant="s2" className="mb-4">Subtitle 2: Lorem ipsum dolor sit amet.</Text>
      <Text variant="p1" className="mb-4">Paragraph 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text variant="p2" className="mb-4">Paragraph 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text variant="c1" className="mb-4">Caption 1: Lorem ipsum dolor sit amet.</Text>
      <Text variant="c2" className="mb-4">Caption 2: Lorem ipsum dolor sit amet.</Text>
    </div>
  );
}