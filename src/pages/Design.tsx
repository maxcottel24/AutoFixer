import { Text } from "../components/Text";

export const DesignPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Design System</h1>
      <p className="mb-6">
        This page showcases the design system used in this project, including typography, colors, and spacing.
      </p>

      {/* // add all Text variants here for demonstration */}
      <div className="gap-4 ">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="s1">Subtitle 1: Lorem ipsum dolor sit amet.</Text>
      <Text variant="s2">Subtitle 2: Lorem ipsum dolor sit amet.</Text>
      <Text variant="p1">Paragraph 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text variant="p2">Paragraph 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Text variant="c1">Caption 1: Lorem ipsum dolor sit amet.</Text>
      <Text variant="c2">Caption 2: Lorem ipsum dolor sit amet.</Text>
      <Text variant="price">price</Text>
      <Text variant="carPageName">carPageName</Text>
      <Text variant="carPageBrand">carPageBrand</Text>
      <Text variant="carPageClass">carPageClass</Text>
      <Text variant="carPageTitleStats">carPageTitleStats</Text>
      <Text variant="carPageStats">carPageStats</Text>
      <Text variant="colorTitle">colorTitle</Text>
      <Text variant="carPageDescription">carPageDescription' </Text>
      <Text variant="weaponSystemTitle">weaponSystemTitle</Text>
      <Text variant="weaponSystemTitleStats">weaponSystemTitleStats</Text>
      <Text variant="weaponSystemSubtitle">weaponSystemSubtitle</Text>
      </div>
    </div>
  );
}