'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { usePathFollower } from '@/hooks/usePathFollower';
import { PathImageStream } from '@/components/PathImageStream'; // update path as needed


export default function SvgFollowPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const paused = selectedImage !== null;

  const point1 = usePathFollower("motionPath", 5000, svgRef, paused);
  const point2 = usePathFollower("motionPath2", 6000, svgRef, paused);
  const point3 = usePathFollower("motionPath3", 8000, svgRef, paused);
  const point4 = usePathFollower("motionPath4", 9000, svgRef, paused);
  const point5 = usePathFollower("motionPath5", 10000, svgRef, paused);

  const renderAnimatedImage = (point: { x: number; y: number }, index: number, duration: number) => {
    if (selectedImage !== null) return null; // hide all when focused

    return (
      <motion.image
        key={index}
        href="/0Z.png"
        x={point.x - 2.5}
        y={point.y - 2.5}
        width={5}
        height={5}
        animate={
          paused
            ? { scale: 1 }
            : { scale: [0, 2, 0] }
        }
        transition={
          paused
            ? { duration: 0.3 }
            : { duration, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ cursor: 'pointer', transformOrigin: 'center' }}
        onClick={() => setSelectedImage(index)}
      />
    );
  };

  return (
<main className="flex min-h-screen items-center justify-center bg-white p-8 relative overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 210 210"
        width="210mm"
        height="210mm"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-10"
      >
        <image id="background" href="/img.png" x="0" y="-40" width="210" height="297" />

        <path id="motionPath" d="m 147.25129,29.48868
                                         c -0.92852,-0.992559 -1.85705,-1.985125 -2.72154,-2.657508 -0.8645,-0.672383 -1.66494,-1.024576 -3.04174,-1.088609 -1.3768,-0.06403 -3.32986,0.160089 -6.09946,0.84849 -2.76961,0.688401 -6.35556,1.841028 -9.49336,3.05773 -3.13781,1.216702 -5.82727,2.497398 -8.70894,3.890202 -2.88166,1.392805 -5.95533,2.897623 -10.00567,4.978829 -4.05035,2.081206 -9.077087,4.738653 -15.048534,7.716371 -5.971448,2.977717 -12.887222,6.275517 -17.81804,8.404731 -4.930819,2.129214 -7.876425,3.089737 -10.678037,3.698084 -2.801612,0.608347 -5.459061,0.864487 -7.668329,0.816456 -2.209268,-0.04803 -3.970229,-0.400223 -5.491101,-1.3928 -1.520873,-0.992577 -2.801572,-2.625469 -3.473953,-4.546579 -0.672381,-1.921109 -0.736416,-4.130313 -0.272143,-6.339585 0.464273,-2.209273 1.456814,-4.418477 2.769572,-6.243524 1.312759,-1.825046 2.94565,-3.265833 4.578589,-4.418493 1.63294,-1.15266 3.265832,-2.017133 5.154922,-2.817593 1.889091,-0.80046 4.034262,-1.536862 6.259544,-2.16122 2.225282,-0.624359 4.530538,-1.136638 6.835842,-1.648928"
                                         fill="none" stroke="none" />
                <path id="motionPath2" d="m 131.22274,24.723124
                                          c -0.99617,-1.267851 -1.99235,-2.535707 -3.62246,-3.305476 -1.63012,-0.769769 -3.8941,-1.041447 -6.92793,-0.950881 -3.03383,0.09057 -6.83731,0.543361 -10.59562,1.539547 -3.75832,0.996187 -7.47124,2.535689 -11.048428,3.803551 -3.577188,1.267861 -7.018436,2.264012 -9.916408,2.762096 -2.897972,0.498085 -5.252507,0.498085 -7.1543,0.271678 -1.901793,-0.226407 -3.350739,-0.679202 -4.120507,-1.448981 -0.769768,-0.769778 -0.860327,-1.856486 -0.63392,-2.762102 0.226407,-0.905615 0.769762,-1.630089 1.313127,-2.354576"
                                       fill="none" stroke="none" />
                <path id="motionPath3" d="m 165.78978,39.670439
                                          c -1.02458,-1.152652 -2.04916,-2.305304 -3.23384,-2.945668 -1.18469,-0.640363 -2.52942,-0.768433 -4.0503,-0.464252 -1.52088,0.304181 -3.2178,1.04058 -5.15492,2.305314 -1.93712,1.264734 -4.11431,3.057712 -6.41964,4.962808 -2.30532,1.905096 -4.73865,3.922197 -7.70036,6.91593 -2.96171,2.993733 -6.45161,6.963898 -10.35787,11.030242 -3.90625,4.066343 -8.22861,8.228616 -11.5265,11.350404 -3.29789,3.121788 -5.57112,5.202917 -7.94049,7.236087 -2.36936,2.033171 -4.83471,4.018257 -7.68435,6.179503 -2.849647,2.161245 -6.083412,4.49852 -9.941639,7.252108 -3.858227,2.753589 -8.340673,5.92332 -12.42302,8.676905 -4.082348,2.75358 -7.764356,5.09085 -10.453893,6.67575 -2.689538,1.58491 -4.386466,2.41737 -5.795273,3.05773 -1.408807,0.64037 -2.529417,1.08862 -3.762129,1.52086 -1.232711,0.43225 -2.577447,0.84848 -4.802736,1.16866 -2.22529,0.32018 -5.330985,0.5443 -7.95649,0.44825 -2.625505,-0.0961 -4.770679,-0.51229 -7.011969,-1.36078 -2.24129,-0.84849 -4.578565,-2.12919 -6.323563,-3.61805 -1.744999,-1.48886 -2.897629,-3.18579 -4.034281,-5.44309 -1.136653,-2.2573 -2.257266,-5.074842 -3.025706,-7.844437 -0.768439,-2.769595 -1.184666,-5.491078 -1.2487,-8.292693 -0.06403,-2.801614 0.224124,-5.683186 0.400224,-8.052544 0.176101,-2.369358 0.240136,-4.226373 0.592341,-6.195507 0.352206,-1.969134 0.992554,-4.050269 1.648932,-6.099449 0.656379,-2.049179 1.328746,-4.06628 2.177236,-6.051422 0.84849,-1.985143 1.873049,-3.938209 2.737546,-5.555137 0.864496,-1.616927 1.56888,-2.897626 2.67352,-4.418504 1.10464,-1.520877 2.609461,-3.281838 3.890196,-4.514543 1.280736,-1.232704 2.337311,-1.937088 3.393909,-2.641487"
                                       fill="none" stroke="none" />
                <path id="motionPath4" d="m 175.77869,52.706439
                                          c 0.99617,-0.452804 1.99234,-0.905609 2.3093,-0.362227 0.31696,0.543382 -0.0453,2.082884 -0.90562,4.12053 -0.86034,2.037646 -2.21872,4.573296 -4.12053,7.607123 -1.9018,3.033827 -4.3469,6.565634 -8.46747,12.406891 -4.12058,5.841258 -9.91637,13.99158 -15.0331,20.738417 -5.11673,6.746837 -9.55413,12.089827 -15.12369,18.655567 -5.56956,6.56574 -12.27094,14.35383 -18.65554,21.41764 -6.3846,7.06381 -12.45206,13.40295 -18.157451,18.15743 -5.705389,4.75447 -11.048375,7.92404 -16.980179,10.00695 -5.931803,2.08291 -12.452057,3.07906 -18.474411,3.03377 -6.022355,-0.0453 -11.546461,-1.132 -16.391511,-2.94324 -4.84505,-1.81125 -9.010767,-4.3469 -12.995485,-7.87882 -3.984717,-3.53192 -7.788195,-8.05987 -10.776727,-12.4974 -2.988532,-4.43753 -5.161947,-8.78436 -6.927899,-14.53505 -1.765952,-5.75069 -3.124339,-12.90486 -3.758265,-19.60643 -0.633925,-6.70157 -0.543366,-12.950143 0.996199,-19.198907 1.539565,-6.248763 4.528015,-12.49734 7.516525,-18.746042"
                                       fill="none" stroke="none" />
                <path id="motionPath5" d="m 182.0274,68.735717
                                          c 2.44514,-1.358412 4.89028,-2.716823 6.92792,-3.396031 2.03764,-0.679208 3.6677,-0.679208 5.11668,0.22642 1.44899,0.905627 2.71682,2.716809 3.44131,4.346919 0.72449,1.630109 0.90561,3.079055 0.31695,5.478953 -0.58866,2.399897 -1.94705,5.750584 -3.07907,8.874964 -1.13202,3.124379 -2.03761,6.022268 -3.39604,9.41834 -1.35843,3.396072 -3.16962,7.290118 -4.98085,10.957868 -1.81123,3.66775 -3.62241,7.10899 -6.61096,12.45216 -2.98856,5.34316 -7.15428,12.58789 -11.32012,18.97249 -4.16584,6.3846 -8.33156,11.9087 -12.72381,16.11981 -4.39225,4.21111 -9.01076,7.109 -14.21807,11.72767 -5.20731,4.61867 -11.00309,10.9578 -17.70467,15.80285 -6.70159,4.84504 -14.30855,8.19572 -22.32327,10.86729 -8.014726,2.67157 -16.436723,4.66387 -24.043905,5.61476 -7.607182,0.95088 -14.399113,0.86032 -21.191181,0.76976"
                                       fill="none" stroke="none" />

        <PathImageStream
          pathId="motionPath"
          duration={5000}
          count={5}
          delayStep={1000}
          paused={paused}
          svgRef={svgRef}
          onClick={(index) => setSelectedImage(index)}
        />

        <PathImageStream
          pathId="motionPath2"
          duration={5000}
          count={5}
          delayStep={1000}
          paused={paused}
          svgRef={svgRef}
          onClick={(index) => setSelectedImage(index + 100)} // offset ID for uniqueness
        />
        <PathImageStream
                  pathId="motionPath3"
                  duration={8000}
                  count={8}
                  delayStep={1000}
                  paused={paused}
                  svgRef={svgRef}
                  onClick={(index) => setSelectedImage(index + 200)} // offset ID for uniqueness
                />
        <PathImageStream
                          pathId="motionPath4"
                          duration={9000}
                          count={9}
                          delayStep={1000}
                          paused={paused}
                          svgRef={svgRef}
                          onClick={(index) => setSelectedImage(index + 300)} // offset ID for uniqueness
                        />
        <PathImageStream
                                  pathId="motionPath5"
                                  duration={10000}
                                  count={9}
                                  delayStep={1000}
                                  paused={paused}
                                  svgRef={svgRef}
                                  onClick={(index) => setSelectedImage(index + 300)} // offset ID for uniqueness
                                />
      </svg>

      {/* Overlay and Enlarged Image */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            {/* Dark background */}
            <motion.div
                          className="fixed inset-0 bg-black z-20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.5 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setSelectedImage(null)}
                        />

            <motion.div
              className="fixed inset-0 z-30 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

            {/* Centered Enlarged Image */}
            <motion.img
              src="/0Z.png"
              alt="zoomed"
              className="z-30 rounded-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: 'min(40vw, 200px)',
                height: 'auto',
                maxHeight: '60vh',
              }}
              onClick={() => setSelectedImage(null)}
            />

            </motion.div>

          </>
        )}
      </AnimatePresence>
    </main>
  );
}
