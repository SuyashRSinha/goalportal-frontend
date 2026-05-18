import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, ShieldCheck, Clock3 } from "lucide-react";
import api from "../services/api";

function AuditLogsDashboard() {

  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {

    try {

      const response =
        await api.get("/audit");

      setLogs(response.data);

    }

    catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchLogs();

  }, []);

  return (

    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />

      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-8">

        {/* TOP BAR */}

        <div className="flex items-center justify-between mb-10">

          {/* BACK BUTTON */}

          <motion.button

            whileHover={{
              scale: 1.08
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() => {

              window.location.href =
                "/admin-dashboard";

            }}

            className="w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
          >

            <ArrowLeft className="w-6 h-6 text-white" />

          </motion.button>

          {/* STATUS */}

          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-xl">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-sm text-slate-300 font-medium">

              Live Platform Monitoring

            </p>

          </div>

        </div>

        {/* HEADER */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          className="mb-12"
        >

          <div className="flex items-center gap-4 mb-5">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.35)]">

              <ShieldCheck className="w-8 h-8 text-white" />

            </div>

            <div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">

                Audit Logs

              </h1>

              <p className="text-slate-400 text-lg mt-1">

                Real-time enterprise governance & activity tracking

              </p>

            </div>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_0_40px_rgba(15,23,42,0.55)]"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-slate-400 text-sm">

                  Total Activities

                </p>

                <h2 className="text-4xl font-black mt-2">

                  {logs.length}

                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                <Activity className="text-cyan-400 w-7 h-7" />

              </div>

            </div>

          </motion.div>

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.1
            }}

            className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_0_40px_rgba(15,23,42,0.55)]"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-slate-400 text-sm">

                  Secure Events

                </p>

                <h2 className="text-4xl font-black mt-2 text-green-400">

                  {

                    logs.filter(
                      (log) =>
                        log.action
                    ).length

                  }

                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                <ShieldCheck className="text-green-400 w-7 h-7" />

              </div>

            </div>

          </motion.div>

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.2
            }}

            className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_0_40px_rgba(15,23,42,0.55)]"
          >

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-slate-400 text-sm">

                  Active Monitoring

                </p>

                <h2 className="text-4xl font-black mt-2 text-blue-400">

                  24/7

                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                <Clock3 className="text-blue-400 w-7 h-7" />

              </div>

            </div>

          </motion.div>

        </div>

        {/* LOGS */}

        <div className="space-y-6">

          {

            logs.length === 0

              ? (

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-12 text-center backdrop-blur-2xl">

                  <h2 className="text-2xl font-bold mb-3">

                    No Audit Logs Found

                  </h2>

                  <p className="text-slate-400">

                    Platform activities will appear here.

                  </p>

                </div>

              )

              : (

                logs.map((log, index) => (

                  <motion.div

                    key={log.id}

                    initial={{
                      opacity: 0,
                      y: 20
                    }}

                    animate={{
                      opacity: 1,
                      y: 0
                    }}

                    transition={{
                      delay: index * 0.05
                    }}

                    whileHover={{
                      scale: 1.01
                    }}

                    className="group bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 hover:border-cyan-400/30 transition-all duration-300 shadow-[0_0_40px_rgba(15,23,42,0.55)]"
                  >

                    {/* TOP */}

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

                      <div className="flex items-start gap-5">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/20">

                          <Activity className="w-7 h-7 text-cyan-400" />

                        </div>

                        <div>

                          <h2 className="text-2xl font-bold mb-2">

                            {log.action}

                          </h2>

                          <p className="text-slate-400">

                            {log.entityType}

                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-400/20 px-5 py-3 rounded-2xl w-fit">

                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />

                        <p className="text-cyan-300 font-semibold">

                          {log.changedBy}

                        </p>

                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="bg-[#0f172a]/80 border border-white/5 rounded-3xl p-6 mb-5">

                      <p className="text-slate-300 leading-8 text-[15px]">

                        {log.description}

                      </p>

                    </div>

                    {/* TIME */}

                    <div className="flex items-center justify-between flex-wrap gap-4">

                      <div className="flex items-center gap-3 text-slate-400">

                        <Clock3 className="w-5 h-5" />

                        <p className="text-sm">

                          {log.changedAt}

                        </p>

                      </div>

                      <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-300">

                        Enterprise Activity Log

                      </div>

                    </div>

                  </motion.div>

                ))

              )

          }

        </div>

      </div>

    </div>

  );
}

export default AuditLogsDashboard;