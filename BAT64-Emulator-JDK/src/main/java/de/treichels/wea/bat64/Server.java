package de.treichels.wea.bat64;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.json.stream.JsonGenerator;
import javax.ws.rs.core.UriBuilder;

import org.glassfish.jersey.jdkhttp.JdkHttpServerFactory;
import org.glassfish.jersey.jsonp.JsonProcessingFeature;
import org.glassfish.jersey.server.ResourceConfig;

import com.sun.net.httpserver.HttpServer;

@SuppressWarnings("restriction")
public class Server {
	public static void main(final String[] args) throws IOException, URISyntaxException {
		final URI baseUri = UriBuilder.fromUri("http://localhost/").port(8080).build();
		final ResourceConfig config = new ResourceConfig(Handler.class).register(JsonProcessingFeature.class)
				.property(JsonGenerator.PRETTY_PRINTING, true);
		final HttpServer server = JdkHttpServerFactory.createHttpServer(baseUri, config);

		System.in.read();

		server.stop(0);
	}
}
