// import clsx from "clsx";
// import {clamp, motion, useMotionValue} from "motion/react";
// import {useEffect, useRef, useState} from "react";
//
// interface Props<T extends number | string> {
//   items: (T)[],
//   updateItem: (item: T) => void,
// }
//
// function useScrollConstraints(ref) {
//   const [constraints, setConstraints] = useState({top: 0, bottom: 0});
//
//   useEffect(() => {
//     const element = ref.current;
//     const viewportHeight = element.offsetHeight;
//     const contentHeight = element.firstChild.offsetHeight;
//
//     console.log(viewportHeight, contentHeight)
//     setConstraints({top: viewportHeight - contentHeight, bottom: 0});
//   }, []);
//
//   return constraints;
// }
//
// export default function DateSwiper<T extends string | number>({items, updateItem}: Props<T>) {
//   const y = useMotionValue(0);
//   const ref = useRef(null);
//
//   const {top, bottom} = useScrollConstraints(ref);
//   function handleWheel(event) {
//     event.preventDefault();
//     const newY = y.get() - event.deltaY;
//     const clampedY = clamp(top, bottom, newY);
//     y.stop();
//     y.set(clampedY);
//   }
//
//   return (
//     <div ref={ref} className="h-[300px] w-full" onWheel={handleWheel}>
//       <motion.div
//         drag="y"
//         dragConstraints={{top, bottom}}
//         style={{y}}
//         className="flex gap-4 flex-col">
//         {items.map((item, i) => (
//           <motion.div
//             key={item}
//             className={clsx('text-xl text-center h-[100px]', i === 1 && 'text-primary')}
//           >{item}</motion.div>
//         ))}
//         {items.map((item, i) => (
//           <motion.div
//             key={item}
//             className={clsx('text-xl text-center h-[100px]', i === 1 && 'text-primary')}
//           >{item}</motion.div>
//         ))}
//       </motion.div>
//     </div>
//   )
// }