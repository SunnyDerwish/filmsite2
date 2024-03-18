import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function TopNavBar() {
  return (
    <div className="w-1/2">
      <Menubar className="h-20 w-full px-8 flex justify-between">
        <div className="flex divide-x divide-gray-200"> </div>
        <MenubarMenu>
          <MenubarTrigger className="text-lg border-r border-gray-200 px-4 pr-10">Posts</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-lg border-r border-gray-200 px-4 pr-10">Reviews</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-lg px-4 ">Recommendations</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}