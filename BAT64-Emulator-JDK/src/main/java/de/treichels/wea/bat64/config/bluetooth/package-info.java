@XmlJavaTypeAdapters({ @XmlJavaTypeAdapter(ByteAdapter.class), @XmlJavaTypeAdapter(ShortAdapter.class),
		@XmlJavaTypeAdapter(StringAdaper.class) })
package de.treichels.wea.bat64.config.bluetooth;

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapters;

import de.treichels.wea.bat64.config.adapters.ByteAdapter;
import de.treichels.wea.bat64.config.adapters.ShortAdapter;
import de.treichels.wea.bat64.config.adapters.StringAdaper;
