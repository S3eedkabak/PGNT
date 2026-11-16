// Adapted from Spectrum UI Login Card (Apache-2.0).
// Preserves staggered card/field entrance. Hands authentication to the existing PNGIT portal.
import { motion, easeOut } from "framer-motion";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { TextMorph } from "../motion-primitives/text-morph";
export default function LoginCard() {
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: easeOut },
    },
  };
  return (
    <motion.div
      className="login-card"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div variants={item} className="login-symbol">
        <LockKeyhole size={28} />
      </motion.div>
      <motion.h2 variants={item} id="modal-title">
        Welcome back.
      </motion.h2>
      <motion.p variants={item}>
        Your next step starts here. Access your courses, learning materials, and
        account.
      </motion.p>
      <motion.div variants={item} className="portal-note">
        <LockKeyhole size={19} />
        <span>
          Sign in securely through the PNGIT student portal using your existing
          account.
        </span>
      </motion.div>
      <motion.a
        variants={item}
        className="btn primary"
        href="https://pngit.edu.sa/wp-login.php?redirect_to=https%3A%2F%2Fpngit.edu.sa%2Fprofile%2F"
      >
        <TextMorph as="span">Continue to student login</TextMorph>
        <ArrowUpRight size={18} />
      </motion.a>
      <motion.a
        variants={item}
        className="text-link"
        href="https://pngit.edu.sa/wp-login.php?action=lostpassword"
      >
        <TextMorph as="span">Forgot your password?</TextMorph>
      </motion.a>
      <motion.p variants={item} className="small">
        New to PNGIT?{" "}
        <a
          href="#contact"
          onClick={() => document.querySelector("dialog")?.close()}
        >
          Talk to our training team
        </a>
      </motion.p>
    </motion.div>
  );
}
